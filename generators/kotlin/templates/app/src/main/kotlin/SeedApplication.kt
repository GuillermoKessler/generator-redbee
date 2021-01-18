package <%= packageName %>

import org.springframework.boot.autoconfigure.SpringBootApplication
import org.springframework.boot.runApplication

@SpringBootApplication
class SeedApplication

fun main(args: Array<String>) {
	runApplication<SeedApplication>(*args)
}
