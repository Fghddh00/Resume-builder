package learn.resume.builder.controller;

import learn.resume.builder.domain.ResumeService;
import learn.resume.builder.models.Resume;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins = {"http://localhost:3000"})
@RequestMapping("/api/resume")
public class ResumeController {

    private final ResumeService service;

    public ResumeController(ResumeService service) {
        this.service = service;
    }

    @GetMapping
    public List<Resume> findAll(){
        return service.findAll();
    }

    @GetMapping("/{resumeId}")
    public ResponseEntity<Resume> findById(@PathVariable int resumeId){
        Resume resume = service.findById(resumeId);

        if (resume == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(resume);
    }


}
