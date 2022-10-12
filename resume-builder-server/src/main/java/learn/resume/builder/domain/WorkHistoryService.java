package learn.resume.builder.domain;

import learn.resume.builder.data.WorkHistoryRepository;
import learn.resume.builder.models.WorkHistory;

public class WorkHistoryService {

    private final WorkHistoryRepository repository;

    public WorkHistoryService(WorkHistoryRepository repository) {
        this.repository = repository;
    }


    public Result<WorkHistory> addWorkHistory(WorkHistory workHistory) {
        Result<WorkHistory> result = validate(workHistory);

        if(!result.isSuccess()){
            return result;
        }

        if (workHistory.getWorkHistoryId() != 0){
            result.addMessage(ResultType.INVALID, "workHistoryId cannot be set for 'add' operation");
            return result;
        }
       return result;
    }

    private Result<WorkHistory> validate(WorkHistory workHistory) {
    }
}
