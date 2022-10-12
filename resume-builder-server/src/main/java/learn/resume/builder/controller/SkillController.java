package learn.resume.builder.controller;

import learn.resume.builder.domain.SkillService;
import learn.resume.builder.models.Education;
import learn.resume.builder.models.Skill;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/view_resume")
public class SkillController {

    private final SkillService service;

    public SkillController(SkillService service) {
        this.service = service;
    }
    @GetMapping
    public List<Skill> findAll() {
        return service.findAll();
    }

    @GetMapping("/{skillId}")
    public Skill findById(@PathVariable int skillId) {
        return service.findById(skillId);
    }
}
