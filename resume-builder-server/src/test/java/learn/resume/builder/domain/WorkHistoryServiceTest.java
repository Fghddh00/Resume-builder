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

    @Test
    void shouldAddWorkHistory(){
        WorkHistory workHistory = new WorkHistory();
        workHistory.setJobTitle("Actress");
        workHistory.setStartDate(LocalDate.of(2015, 7,19));
        workHistory.setEndDate(LocalDate.of(2016, 9,19));
        workHistory.setJobDescription("description");

        Result<WorkHistory> result = service.addWorkHistory(workHistory);
        assertTrue(result.isSuccess());
    }

    @Test
    void shouldNotAddIfWorkHistoryIdIsNotZero(){
        WorkHistory workHistory = new WorkHistory();
        workHistory.setWorkHistoryId(3);
        workHistory.setJobTitle("Actress");
        workHistory.setStartDate(LocalDate.of(2015, 7,19));
        workHistory.setEndDate(LocalDate.of(2016, 9,19));
        workHistory.setJobDescription("description");

        Result<WorkHistory> result = service.addWorkHistory(workHistory);
        assertFalse(result.isSuccess());
        assertEquals(result.getMessages().size(), 1);
    }
    @Test
    void shouldNotAddNullWorkHistory(){
        Result<WorkHistory> result = service.addWorkHistory(null);
        assertFalse(result.isSuccess());
        assertEquals(result.getMessages().size(), 1);
    }
    @Test
    void shouldNotAddNullJobTitleInWorkHistory(){
        WorkHistory workHistory = new WorkHistory();
        workHistory.setJobTitle(null);
        workHistory.setStartDate(LocalDate.of(2015, 7,19));
        workHistory.setEndDate(LocalDate.of(2016, 9,19));
        workHistory.setJobDescription("description");

        Result<WorkHistory> result = service.addWorkHistory(workHistory);
        assertFalse(result.isSuccess());
        assertEquals(result.getMessages().size(), 1);
    }
    @Test
    void shouldNotAddBlankJobTitleInWorkHistory(){
        WorkHistory workHistory = new WorkHistory();
        workHistory.setJobTitle("");
        workHistory.setStartDate(LocalDate.of(2015, 7,19));
        workHistory.setEndDate(LocalDate.of(2016, 9,19));
        workHistory.setJobDescription("description");

        Result<WorkHistory> result = service.addWorkHistory(workHistory);
        assertFalse(result.isSuccess());
        assertEquals(result.getMessages().size(), 1);
    }
    @Test
    void shouldAddNullStartDateInWorkHistory(){
        WorkHistory workHistory = new WorkHistory();
        workHistory.setJobTitle("Actress");
        workHistory.setStartDate(null);
        workHistory.setEndDate(LocalDate.of(2016, 9,19));
        workHistory.setJobDescription("description");

        Result<WorkHistory> result = service.addWorkHistory(workHistory);
        assertFalse(result.isSuccess());
        assertEquals(result.getMessages().size(), 1);
    }

    @Test
    void shouldNotAddIfStartDateIsAfterEndDateInWorkHistory() {
        WorkHistory workHistory = new WorkHistory();
        workHistory.setJobTitle("actress");
        workHistory.setStartDate(LocalDate.of(2019, 7, 19));
        workHistory.setEndDate(LocalDate.of(2015, 9, 19));
        workHistory.setJobDescription("description");

        Result<WorkHistory> result = service.addWorkHistory(workHistory);
        assertFalse(result.isSuccess());
        assertEquals(result.getMessages().size(), 1);
    }
    @Test
    void shouldNotAddIfStartDateIsAfterTodayInWorkHistory() {
        WorkHistory workHistory = new WorkHistory();
        workHistory.setJobTitle("actress");
        workHistory.setStartDate(LocalDate.of(2024, 7, 19));
        workHistory.setEndDate(LocalDate.of(2015, 9, 19));
        workHistory.setJobDescription("description");

        Result<WorkHistory> result = service.addWorkHistory(workHistory);
        assertFalse(result.isSuccess());
        // two error messages for start being after end date and today's date
        assertEquals(result.getMessages().size(), 2);
    }
    @Test
    void shouldNotAddIfEndDateIsAfterTodayInWorkHistory() {
        WorkHistory workHistory = new WorkHistory();
        workHistory.setJobTitle("actress");
        workHistory.setStartDate(LocalDate.of(2015, 7, 19));
        workHistory.setEndDate(LocalDate.of(2025, 9, 19));
        workHistory.setJobDescription("description");

        Result<WorkHistory> result = service.addWorkHistory(workHistory);
        assertFalse(result.isSuccess());
        assertEquals(result.getMessages().size(), 1);
    }
    @Test
    void shouldNotAddNullJobDescriptionInWorkHistory() {
        WorkHistory workHistory = new WorkHistory();
        workHistory.setJobTitle("actress");
        workHistory.setStartDate(LocalDate.of(2015, 7, 19));
        workHistory.setEndDate(LocalDate.of(2020, 9, 19));
        workHistory.setJobDescription(null);

        Result<WorkHistory> result = service.addWorkHistory(workHistory);
        assertFalse(result.isSuccess());
        assertEquals(result.getMessages().size(), 1);
    }
    @Test
    void shouldNotAddBlankJobDescriptionInWorkHistory() {
        WorkHistory workHistory = new WorkHistory();
        workHistory.setJobTitle("actress");
        workHistory.setStartDate(LocalDate.of(2015, 7, 19));
        workHistory.setEndDate(LocalDate.of(2020, 9, 19));
        workHistory.setJobDescription("");

        Result<WorkHistory> result = service.addWorkHistory(workHistory);
        assertFalse(result.isSuccess());
        assertEquals(result.getMessages().size(), 1);
    }
    @Test
    void shouldNotDeleteNonExistentId() {
        when(repository.deleteById(11)).thenReturn(false);

        Result<WorkHistory> result = service.deleteById(1);
        assertFalse(result.isSuccess());
    }
    @Test
    void shouldDeleteId(){
        when(repository.deleteById(1)).thenReturn(true);

        Result<WorkHistory> result = service.deleteById(1);
        assertTrue(result.isSuccess());
    }
    @Test
    void shouldUpdate() {
        WorkHistory workHistory = new WorkHistory(1, "title", LocalDate.of(2020, 1, 10)
                , LocalDate.of(2020, 4, 18), "description");
        when(repository.update(workHistory)).thenReturn(true);

        Result<WorkHistory> result = service.update(workHistory);
        assertTrue(result.isSuccess());
    }

    @Test
    void shouldNotUpdate() {
        WorkHistory workHistory = new WorkHistory(1, "title", LocalDate.of(2020, 1, 10)
                , LocalDate.of(2020, 4, 18), "description");
        when(repository.update(workHistory)).thenReturn(false);

        Result<WorkHistory> result = service.update(workHistory);
        assertFalse(result.isSuccess());
    }

    @Test
    void shouldNotUpdateNullJobTitle() {
        WorkHistory workHistory = new WorkHistory(1, null, LocalDate.of(2020, 1, 10)
                , LocalDate.of(2020, 4, 18), "description");
        when(repository.update(workHistory)).thenReturn(false);

        Result<WorkHistory> result = service.update(workHistory);
        assertFalse(result.isSuccess());
    }
    @Test
    void shouldNotUpdateBlankJobTitle() {
        WorkHistory workHistory = new WorkHistory(1, "", LocalDate.of(2020, 1, 10)
                , LocalDate.of(2020, 4, 18), "description");
        when(repository.update(workHistory)).thenReturn(false);

        Result<WorkHistory> result = service.update(workHistory);
        assertFalse(result.isSuccess());
    }

    @Test
    void shouldNotUpdateNullStartDate() {
        WorkHistory workHistory = new WorkHistory(1, "title", null
                , LocalDate.of(2020, 4, 18), "description");
        when(repository.update(workHistory)).thenReturn(false);

        Result<WorkHistory> result = service.update(workHistory);
        assertFalse(result.isSuccess());
    }
    @Test
    void shouldNotUpdateStartDateThatIsAfterEndDate() {
        WorkHistory workHistory = new WorkHistory(1, "title", LocalDate.of(2021, 1, 10)
                , LocalDate.of(2020, 4, 18), "description");
        when(repository.update(workHistory)).thenReturn(false);

        Result<WorkHistory> result = service.update(workHistory);
        assertFalse(result.isSuccess());
    }
    @Test
    void shouldNotUpdateStartDateThatIsAfterLocalDateNow() {
        WorkHistory workHistory = new WorkHistory(1, "title", LocalDate.of(2023, 1, 10)
                , LocalDate.of(2020, 4, 18), "description");
        when(repository.update(workHistory)).thenReturn(false);

        Result<WorkHistory> result = service.update(workHistory);
        assertFalse(result.isSuccess());
    }
    @Test
    void shouldNotUpdateEndDateThatIsAfterLocalDateNow() {
        WorkHistory workHistory = new WorkHistory(1, "title", LocalDate.of(2021, 1, 10)
                , LocalDate.of(2024, 4, 18), "description");
        when(repository.update(workHistory)).thenReturn(false);

        Result<WorkHistory> result = service.update(workHistory);
        assertFalse(result.isSuccess());
    }
    @Test
    void shouldNotUpdateNullJobDescription() {
        WorkHistory workHistory = new WorkHistory(1, "title", LocalDate.of(2020, 1, 10)
                , LocalDate.of(2020, 4, 18), null);
        when(repository.update(workHistory)).thenReturn(false);

        Result<WorkHistory> result = service.update(workHistory);
        assertFalse(result.isSuccess());
    }
    @Test
    void shouldNotUpdateBlankJobDescription() {
        WorkHistory workHistory = new WorkHistory(1, "title", LocalDate.of(2020, 1, 10)
                , LocalDate.of(2020, 4, 18), "");
        when(repository.update(workHistory)).thenReturn(false);

        Result<WorkHistory> result = service.update(workHistory);
        assertFalse(result.isSuccess());
    }

}