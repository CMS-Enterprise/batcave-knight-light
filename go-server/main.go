package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io"
	"net/http"
	"os"
	"os/signal"
	"strings"
	"sync"
	"sync/atomic"
	"time"

	"log/slog"

	"github.com/lmittmann/tint"
)

type metadata struct {
	requests atomic.Uint64
}

var globalServerStats metadata
var globalService *localLightService

type lightStatus struct {
	Server string `json:"server"`
	Status string `json:"status"`
}

type localLightService struct {
	mu     sync.Mutex
	status string
	server string
}

func (s *localLightService) Activate() {
	s.mu.Lock()
	defer s.mu.Unlock()
	if s.status == "ON" {
		s.status = "OFF"
		// return
	}
	s.status = "ON"
}

func (s *localLightService) WriteStatus(w io.Writer) error {
	return json.NewEncoder(w).Encode(map[string]string{"status": s.status, "server": s.server})
}

func main() {
	slog.SetDefault(slog.New(tint.NewHandler(os.Stderr, &tint.Options{
		Level:      slog.LevelDebug,
		TimeFormat: time.TimeOnly,
	})))

	fmt.Println("Knight Light Server Go")
	mux := http.NewServeMux()
	mux.Handle("/ping", getMiddleware(pingHandler))
	mux.Handle("/health", getMiddleware(healthHandler))
	mux.Handle("/activate", getMiddleware(activateHandler))
	mux.Handle("/status", getMiddleware(statusHandler))

	server := &http.Server{
		Addr:    ":3000",
		Handler: mux,
	}
	globalService = &localLightService{
		status: "OFF",
		server: "go",
	}
	shutdownSignal := make(chan os.Signal)
	signal.Notify(shutdownSignal, os.Interrupt, os.Kill)

	// Listen for incoming requests
	go listenAndServe(server)
	go heartbeat(time.Second * 3)

	// Listen for shutdown signal
	shutdownOnSignal(shutdownSignal, time.Second*5, server)
}

func listenAndServe(server *http.Server) {
	slog.Info(fmt.Sprintf("server listening @ %s", server.Addr))
	if err := server.ListenAndServe(); err != nil && err != http.ErrServerClosed {
		slog.Error("server failed", "error", err)
	}
	slog.Debug("server stopped")
}

// gracefulshutdown starts when ctx.Done is triggered and will do a shutdown with a max timeout
func shutdownOnSignal(shutdownChan <-chan os.Signal, timeout time.Duration, server *http.Server) {
	<-shutdownChan
	slog.Info("graceful shutdown requested")
	timeoutCtx, cancel := context.WithTimeout(context.Background(), timeout)
	defer cancel()

	if err := server.Shutdown(timeoutCtx); err != nil {
		slog.Error("shutdown failure", "error", err)
		return
	}

	slog.Info("graceful shutdown complete")
}

func heartbeat(interval time.Duration) {
	start := time.Now()
	for {
		<-time.After(interval)
		upTime := time.Since(start)
		reqCount := globalServerStats.requests.Load()
		slog.Debug("heartbeat", "up_time", upTime, "request_count", reqCount)
	}
}

func getMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		logger := slog.Default().With("method", r.Method, "remote_addr", r.RemoteAddr, "request_uri", r.RequestURI)
		_ = globalServerStats.requests.Add(1)
		if r.Method != http.MethodGet {
			logger.Warn("bad request, invalid method")
			return
		}
		logger.Info("request")
		next(w, r)
	}
}

func pingHandler(w http.ResponseWriter, r *http.Request) {
	strings.NewReader("pong").WriteTo(w)
}

func healthHandler(w http.ResponseWriter, r *http.Request) {
	w.WriteHeader(http.StatusOK)
}

func activateHandler(w http.ResponseWriter, r *http.Request) {
	globalService.Activate()
	globalService.WriteStatus(w)
}

func statusHandler(w http.ResponseWriter, r *http.Request) {
	globalService.WriteStatus(w)
}
