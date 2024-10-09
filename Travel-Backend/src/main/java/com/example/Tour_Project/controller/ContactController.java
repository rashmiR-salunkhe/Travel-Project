package com.example.Tour_Project.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.Tour_Project.model.Contact;
import com.example.Tour_Project.service.ContactService;

@RestController
@RequestMapping("/contact")
@CrossOrigin(origins = "http://127.0.0.1:5500") 
public class ContactController {
	
    @Autowired	
    private ContactService contactService;

    @PostMapping("/submit")
    public ResponseEntity<String> submitContact(@RequestBody Contact contact) {
        contactService.saveContact(contact);
        return ResponseEntity.ok("We will contact you soon.");
    }
}