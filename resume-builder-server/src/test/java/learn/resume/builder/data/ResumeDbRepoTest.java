package learn.resume.builder.data;

import learn.resume.builder.models.Resume;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class ResumeDbRepoTest {

    @Autowired
    ResumeDbRepo resumeRepo;

    @Autowired
    KnownGoodState knownGoodState;

    @BeforeEach
    void setup() {
        knownGoodState.set();
    }

    @Test
    void shouldNotGetTemplateIdByNonExistingResumeId() {
        Resume actual = resumeRepo.getById(100);

        assertNull(actual);
    }

    @Test
    void shouldGetTemplateIdByResumeId() {
        Resume actual = resumeRepo.getById(1);

        assertNotNull(actual);
        assertEquals(1, actual.getTemplateId());
    }

}