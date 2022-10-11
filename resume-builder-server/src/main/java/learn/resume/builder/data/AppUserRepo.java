package learn.resume.builder.data;

import learn.resume.builder.domain.Result;
import learn.resume.builder.models.AppUser;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
public class AppUserRepo {
    private final JdbcTemplate jdbcTemplate;

    public AppUserRepo(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public AppUser findByUsername(String username) {
        List<String> roles = getRolesByUsername(username);
        throw new UnsupportedOperationException();
    }

    @Transactional
    public AppUser create(AppUser user) {
        throw new UnsupportedOperationException();
    }
    private List<String> getRolesByUsername(String username) {
        throw new UnsupportedOperationException();
    }

}
