package learn.resume.builder.security;

import learn.resume.builder.data.AppUserRepo;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AppUserService {
    private final AppUserRepo repository;
    private final PasswordEncoder encoder;

    public AppUserService(AppUserRepo repository, PasswordEncoder encoder) {
        this.repository = repository;
        this.encoder = encoder;
    }

}
