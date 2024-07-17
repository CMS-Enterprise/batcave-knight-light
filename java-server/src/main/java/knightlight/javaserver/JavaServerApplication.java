/**
 * Knight Light Java Server main application.
 */
package knightlight.javaserver;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.filter.CommonsRequestLoggingFilter;

@SpringBootApplication
public class JavaServerApplication {

  /**
   * Runtime start logic.
   * @param args can be passed in from the CLI
   */
  public static void main(final String[] args) {
    SpringApplication.run(JavaServerApplication.class, args);
  }

}
