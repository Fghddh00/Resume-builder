package learn.resume.builder.data;

import learn.resume.builder.models.AppUserInfo;
import learn.resume.builder.models.Education;

import java.util.List;

public interface AppUserInfoRepo {

    List<AppUserInfo> findAll();
    AppUserInfo add(AppUserInfo appUserInfo);
}
