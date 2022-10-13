package learn.resume.builder.data;

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
    public AppUserInfo add(AppUserInfo appUserInfo) {
        throw new UnsupportedOperationException();
    }

}
