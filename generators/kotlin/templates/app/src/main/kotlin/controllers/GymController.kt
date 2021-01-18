package io.redbee.seed.controllers

import io.redbee.seed.models.Gym
import io.redbee.seed.repositories.GymRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.GetMapping
import org.springframework.web.bind.annotation.PostMapping
import org.springframework.web.bind.annotation.RequestMapping
import org.springframework.web.bind.annotation.RestController
import java.util.*

@RestController
@RequestMapping("/v1/gyms")
class GymController(private val gymRepository: GymRepository) {

    @GetMapping
    fun findAll(): ResponseEntity<List<Gym>>{
        return ResponseEntity.ok(gymRepository.findAll().toList())
    }

    @PostMapping
    fun create(): ResponseEntity<Gym> {
        val fuchsiaGym = Gym(id = UUID.randomUUID(), name = "Fuchsia", city = "Fuchsia")
        return ResponseEntity.ok(gymRepository.save(fuchsiaGym))
    }
}