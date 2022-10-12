package learn.resume.builder.data;

import learn.resume.builder.data.mapper.EducationMapper;
import learn.resume.builder.data.mapper.SkillMapper;
import learn.resume.builder.models.Education;
import learn.resume.builder.models.Skill;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class SkillDbRepository implements SkillRepo {

    private final JdbcTemplate jdbcTemplate;

    public SkillDbRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<Skill> findAll() {
        final String sql = "select skill_id, skill_name from skill;";

        return jdbcTemplate.query(sql, new SkillMapper());
    }

}