package learn.resume.builder.controller;

import learn.resume.builder.domain.EducationService;
import learn.resume.builder.models.Education;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/education")
public class EducationController {

    private final EducationService service;

    public EducationController(EducationService service) {
        this.service = service;
    }

    @GetMapping
    public List<Education> findAll() {
        return service.findAll();
    }

}
