package io.redbee.seed.repositories

import io.redbee.seed.models.Trainer
import org.springframework.data.mongodb.repository.MongoRepository

interface TrainerRepository: MongoRepository<Trainer, String> {
}