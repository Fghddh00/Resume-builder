package learn.resume.builder.controller;

import learn.resume.builder.domain.Result;
import learn.resume.builder.domain.ResultType;
import learn.resume.builder.domain.ResumeService;
import learn.resume.builder.domain.WorkHistoryService;
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

    private final ResumeService resumeService;
    private final WorkHistoryService workHistoryService;

    public ResumeController(ResumeService service, WorkHistoryService workHistoryService) {
        this.resumeService = service;
        this.workHistoryService = workHistoryService;
    }



    @GetMapping("/user")
    public ResponseEntity getResumeByUserId(){
        AppUser currentUser = (AppUser) SecurityContextHolder
                .getContext()
                .getAuthentication()
                .getPrincipal();

        boolean jobSeeker = currentUser.getUserRoles()
                .stream().anyMatch(r->r.getRoleName().equals("Job Seeker"));


        Result<List<Resume>> getResult = resumeService.getResumesByUser(currentUser.getUserId());
        if(getResult.isSuccess()){
            List<Resume> userResumes = getResult.getPayload();

            return ResponseEntity.ok(userResumes);
        } else{
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }

    }


    @GetMapping("/{resumeId}")
    public ResponseEntity<Resume> findByResumeId(@PathVariable int resumeId){
        Resume resume = resumeService.findByResumeId(resumeId);

        if (resume == null){
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok(resume);
    }


    @PostMapping
    public ResponseEntity<Object> addResume(@RequestBody Resume resumeToAdd){

        Result<Resume> result = resumeService.addResume(resumeToAdd);
        result = workHistoryService.addWorkHistoryFromResume(resumeToAdd);

        if (result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.CREATED);
        }

        return ErrorResponse.build(result);
    }

    @DeleteMapping("/{resumeId}")
    public ResponseEntity deleteById(@PathVariable int resumeId){
        Result<Resume> result = resumeService.deleteByResumeId(resumeId);

        if (result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        if (result.getType() == ResultType.NOT_FOUND) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
    }

    @PutMapping("/{resumeId}")
    public ResponseEntity editResume(@PathVariable int resumeId, @RequestBody Resume resume){
        if (resumeId != resume.getResumeId()){
            return new ResponseEntity<>(HttpStatus.CONFLICT);
        }
        Result result = resumeService.updateResume(resume);
        if (result.isSuccess()){
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } else {
            return ErrorResponse.build(result);
        }

    }
}
