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

    @Override
    public Skill findById(int skillId) {
        final String sql = "select skill_id, skill_name"
                + " from skill"
                + " where skill_id = ?;";
        Skill skill = jdbcTemplate.query(sql, new SkillMapper(), skillId)
                .stream().findFirst().orElse(null);
        if(skill != null){
            addResume(skill);
        }
        return skill;
    }

    private void addResume(Skill skill) {
        // need help w/ sql statement
        throw new UnsupportedOperationException();
    }
}
