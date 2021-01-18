package io.redbee.seed.models

import java.util.*
import javax.persistence.*


@Entity(name = "gyms")
class Gym() {
    constructor(id: UUID, name: String, city: String): this() {
        this.id = id
        this.name = name
        this.city = city
    }

    @Id @GeneratedValue(strategy = GenerationType.AUTO)
    lateinit var id: UUID
    lateinit var name: String
    lateinit var city: String
}