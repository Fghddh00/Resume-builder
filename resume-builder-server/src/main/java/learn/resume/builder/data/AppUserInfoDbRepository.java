package learn.resume.builder.data;

import learn.resume.builder.data.mapper.AppUserInfoMapper;
import learn.resume.builder.models.AppUserInfo;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class AppUserInfoDbRepository implements AppUserInfoRepo {
    private final JdbcTemplate jdbcTemplate;

    public AppUserInfoDbRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<AppUserInfo> findAll() {
        throw new UnsupportedOperationException();
    }

    @Override
    public AppUserInfo findUserByResumeId(int resumeId) {
        final String sql = "    select app_user_info.* from resume_app\n" +
                "    inner join app_user_info\n" +
                "    on resume_app.info_id = app_user_info.info_id\n" +
                "    where resume_app.resume_id = ?;\n";

        return jdbcTemplate.query(sql, new AppUserInfoMapper(), resumeId)
                .stream()
                .findFirst().orElse(null);
    }

    @Override
    public AppUserInfo add(AppUserInfo appUserInfo) {
        throw new UnsupportedOperationException();
    }

}
