package learn.resume.builder.controller;

import learn.resume.builder.domain.Result;
import learn.resume.builder.domain.ResumeService;
import learn.resume.builder.models.AppUser;
import learn.resume.builder.models.Resume;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
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

    @GetMapping("/user")
    public ResponseEntity getResumeByUserId(){
        AppUser currentUser = (AppUser) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        boolean jobSeeker = currentUser.getUserRoles()
                .stream().anyMatch(r->r.getRoleName().equals("Job Seeker"));


        Result<List<Resume>> getResult = service.getResumesByUser(currentUser.getUserId());
        if(getResult.isSuccess()){
            List<Resume> userResumes = getResult.getPayload();

            return ResponseEntity.ok(userResumes);
        } else{
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

    }


//    @GetMapping("/{resumeId}")
//    public ResponseEntity<Resume> findById(@PathVariable int resumeId){
//        Resume resume = service.findById(resumeId);
//
//        if (resume == null){
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//        return ResponseEntity.ok(resume);
//    }


    @PostMapping
    public ResponseEntity<Object> addResume(@RequestBody Resume resumeToAdd){

        Result<Resume> result = service.addResume(resumeToAdd);

        if (result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.CREATED);
        }

        return ErrorResponse.build(result);
    }
}
