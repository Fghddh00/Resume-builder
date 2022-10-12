package learn.resume.builder.data;

import learn.resume.builder.models.WorkHistory;

public interface WorkHistoryRepository {
    WorkHistory add(WorkHistory workHistory);
}
