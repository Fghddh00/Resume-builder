package learn.resume.builder.data;

import learn.resume.builder.models.WorkHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.jdbc.support.KeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.Statement;

@Repository
public class WorkHistoryDbRepository implements WorkHistoryRepository{

    @Autowired
    private final JdbcTemplate jdbcTemplate;

    public WorkHistoryDbRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public WorkHistory add(WorkHistory workHistory) {

//        job_title 			varchar(50) not null,
//                start_date 			date not null,
//                end_date			date null,
//                job_description		varchar(2000) not null

        final String sql = "insert into work_history (job_title, start_date, end_date, job_description) "
                + " values (?,?,?,?);";

        KeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, workHistory.getJobTitle());
            ps.setDate(2, Date.valueOf(workHistory.getStartDate()));
            ps.setDate(3, workHistory.getEndDate() == null ? null : Date.valueOf(workHistory.getEndDate()));
            ps.setString(5, workHistory.getJobDescription());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        workHistory.setWorkHistoryId(keyHolder.getKey().intValue());
        return workHistory;
    }
}
