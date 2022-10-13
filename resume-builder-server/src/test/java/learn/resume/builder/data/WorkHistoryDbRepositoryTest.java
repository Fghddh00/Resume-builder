package learn.resume.builder.data;

import learn.resume.builder.models.WorkHistory;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
public class WorkHistoryDbRepositoryTest {

    @Autowired
    WorkHistoryDbRepository repository;

    @Autowired
    JdbcTemplate jdbcTemplate;
    @Autowired
    KnownGoodState knownGoodState;
    @BeforeEach
    void setup() {
        knownGoodState.set();
    }
    @Test
    void findAll() {
        List<WorkHistory> actual = repository.findAll();

        assertNotNull(actual);
        assertTrue(actual.size() >= 2);
    }

}