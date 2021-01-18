package io.redbee.seed.controllers

import io.redbee.seed.models.Trainer
import io.redbee.seed.repositories.TrainerRepository
import org.springframework.http.ResponseEntity
import org.springframework.web.bind.annotation.*

@RestController
@RequestMapping("/v1/trainers")
class TrainerController(private val trainerRepository: TrainerRepository) {

    @GetMapping
    fun listAll():ResponseEntity<List<Trainer>>{
        val trainers = trainerRepository.findAll()
        return ResponseEntity.ok(trainers.toList())
    }

    @PostMapping
    fun create(): ResponseEntity<Trainer> {
        val gary = Trainer(name = "Gary")
        val trainer = trainerRepository.save(gary)
        return ResponseEntity.ok(trainer)
    }
}