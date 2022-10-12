package learn.resume.builder.controller;

import learn.resume.builder.domain.SkillService;
import learn.resume.builder.models.Education;
import learn.resume.builder.models.Skill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/skill")
public class SkillController {

    @Autowired
    private final SkillService service;

    public SkillController(SkillService service) {
        this.service = service;
    }
    @GetMapping
    public List<Skill> findAll() {
        return service.findAll();
    }

}
