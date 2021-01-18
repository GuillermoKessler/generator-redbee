package io.redbee.seed.repositories

import io.redbee.seed.models.Gym
import org.springframework.data.repository.CrudRepository
import java.util.*

interface GymRepository: CrudRepository<Gym, UUID> {
}