package learn.resume.builder.domain;

import learn.resume.builder.data.AppUserInfoRepo;
import learn.resume.builder.models.AppUserInfo;
import learn.resume.builder.models.Skill;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppUserInfoService {
    @Autowired
    private final AppUserInfoRepo repository;

    public AppUserInfoService(AppUserInfoRepo repository) {
        this.repository = repository;
    }

    public List<AppUserInfo> findAll() {
        return repository.findAll();
    }

    public Result<AppUserInfo> add (AppUserInfo appUserInfo){
        Result<AppUserInfo> result = validate(appUserInfo);
        if (!result.isSuccess()) {
            return result;
        }
        if (appUserInfo.getInfoId() != 0) {
            result.addMessage("appUserInfoId cannot be set for `add` operation", ResultType.INVALID);
            return result;
        }
        appUserInfo = repository.add(appUserInfo);
        result.setPayload(appUserInfo);
        return result;
    }
    private Result<AppUserInfo> validate(AppUserInfo appUserInfo) {
        Result<AppUserInfo> result = new Result<>();
        if (appUserInfo == null) {
            result.addMessage("appUserInfo cannot be null", ResultType.INVALID);
            return result;
        }

        return result;
    }

}
