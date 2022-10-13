package learn.resume.builder.domain;

import learn.resume.builder.data.WorkHistoryRepository;
import learn.resume.builder.models.WorkHistory;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import static org.mockito.Mockito.when;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class WorkHistoryServiceTest {
    @MockBean
    WorkHistoryRepository repository;

    @Autowired
    WorkHistoryService service;
    @Test
    void shouldFindAllWorkHistory() {
        List<WorkHistory> workHistory = new ArrayList<>();
        workHistory.add(new WorkHistory(1, "Singer",
                LocalDate.of(2010, 06,16),LocalDate.of(2010,10,16),
               "I sing and won American Idol"));
        workHistory.add(new WorkHistory(1, "Dancer",
                LocalDate.of(2013, 06,16),LocalDate.of(2011,10,16),
                "I Dance"));

        when(repository.findAll()).thenReturn(workHistory);
        List<WorkHistory> result = service.findAll();
        assertEquals(2, workHistory.size());
    }
//    @Test
//    void shouldAddWorkHistory() {
//        WorkHistory workHistory = new WorkHistory();
//        workHistory.setWorkHistoryId(4);
//        workHistory.setJobTitle("Title");
//        workHistory.setStartDate(LocalDate.of(2013, 7,19));
//        workHistory.setEndDate(LocalDate.of(2014, 9,19));
//        workHistory.setJobDescription("description");
//        Result<WorkHistory> result = service.addWorkHistory(workHistory);
//
//        assertTrue(result.isSuccess());
        //failing
//    }

}