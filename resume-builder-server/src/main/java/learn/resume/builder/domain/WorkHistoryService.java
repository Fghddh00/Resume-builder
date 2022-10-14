package learn.resume.builder.domain;

import learn.resume.builder.data.WorkHistoryRepository;
import learn.resume.builder.models.Skill;
import learn.resume.builder.models.WorkHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;


@Service
public class WorkHistoryService {

    @Autowired
    private final WorkHistoryRepository repository;

    public WorkHistoryService(WorkHistoryRepository repository) {
        this.repository = repository;
    }

    public List<WorkHistory> findAll() {
        return repository.findAll();
    }
    public Result<WorkHistory> addWorkHistory(WorkHistory workHistory) {
        Result<WorkHistory> result = validate(workHistory);

        if(!result.isSuccess()){
            return result;
        }

        if (workHistory.getWorkHistoryId() != 0){
            result.addMessage("Work History Id cannot be set for 'add' operation", ResultType.INVALID);
            return result;
        }

        workHistory = repository.add(workHistory);
        result.setPayload(workHistory);
        return result;
    }

    public Result deleteById(int workHistoryId) {
        Result<WorkHistory> result = new Result<>();
        if (!repository.deleteById(workHistoryId)) {
            result.addMessage("Work History Id Id was not found", ResultType.NOT_FOUND);
        }
        if(result.isSuccess()){
            repository.deleteById(workHistoryId);
        }
        return result;
    }

    public Result<WorkHistory> update(WorkHistory workHistory) {
        Result<WorkHistory> result = validate(workHistory);

        if(!result.isSuccess()){
            return result;
        }
        if (workHistory.getWorkHistoryId() <= 0){
            result.addMessage("This Work History needs an Id", ResultType.INVALID);
        }
        if(!repository.update(workHistory)){
            result.addMessage("Work History could not be found", ResultType.NOT_FOUND);
        }

        return result;
    }

    private Result<WorkHistory> validate(WorkHistory workHistory) {
        Result<WorkHistory> result = new Result<>();

        if (workHistory == null){
            result.addMessage("workhistory is null", ResultType.INVALID);
            return result;
        }
        if (workHistory.getJobTitle() == null || workHistory.getJobTitle().isBlank()){
            result.addMessage("job title is required", ResultType.INVALID);
        }
        if (workHistory.getStartDate() == null){
            result.addMessage("start date is required", ResultType.INVALID);
            return result;
        }
        if (workHistory.getStartDate().isAfter(workHistory.getEndDate())){
            result.addMessage("start date cannot be after end date", ResultType.INVALID);
        }
        if (workHistory.getStartDate().isAfter(LocalDate.now())){
            result.addMessage("start date cannot be after today's date", ResultType.INVALID);
        }
        if (workHistory.getEndDate().isAfter(LocalDate.now())){
            result.addMessage("end date cannot be before today's date", ResultType.INVALID);
        }
        if (workHistory.getJobDescription() == null || workHistory.getJobDescription().isBlank()){
            result.addMessage("job description is required", ResultType.INVALID);
        }
        return result;
    }

}
