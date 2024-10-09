package com.example.Tour_Project.repository;

import com.example.Tour_Project.model.Contact;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ContactRepository extends JpaRepository<Contact, Long> {
}
