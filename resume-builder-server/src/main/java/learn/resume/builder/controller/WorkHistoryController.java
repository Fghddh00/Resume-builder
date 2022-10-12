package learn.resume.builder.controller;

import learn.resume.builder.domain.Result;
import learn.resume.builder.domain.WorkHistoryService;
import learn.resume.builder.models.Skill;
import learn.resume.builder.models.WorkHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin(origins={"http://localhost:3000"})
@RequestMapping("/api/workHistory")
public class WorkHistoryController {

    @Autowired
    WorkHistoryService service;

    public WorkHistoryController(WorkHistoryService service) {
        this.service = service;
    }

    @GetMapping
    public List<WorkHistory> findAll() {
        return service.findAll();
    }
    @PostMapping
    public ResponseEntity<Object> add(@RequestBody WorkHistory workHistory){
        Result<WorkHistory> result = service.addWorkHistory(workHistory);
        if (result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.CREATED);
        }
        return ErrorResponse.build(result);
    }
}
