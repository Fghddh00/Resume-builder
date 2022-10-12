package learn.resume.builder.controller;

import learn.resume.builder.domain.Result;
import learn.resume.builder.domain.ResultType;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

<<<<<<< HEAD
public class ErrorResponse {

    public static <T> ResponseEntity<Object> build(Result<T> result) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        if (result.getStatus() == null || result.getStatus() == ResultType.INVALID) {
            status = HttpStatus.BAD_REQUEST;
        } else if (result.getStatus() == ResultType.NOT_FOUND) {
=======
import java.time.LocalDateTime;

public class ErrorResponse {
    private final LocalDateTime timestamp = LocalDateTime.now();
    private final String message;

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public String getMessage() {
        return message;
    }

    public ErrorResponse(String message) {
        this.message = message;
    }

    public static <T> ResponseEntity<Object> build(Result<T> result) {
        HttpStatus status = HttpStatus.INTERNAL_SERVER_ERROR;
        if (result.getType() == null || result.getType() == ResultType.INVALID) {
            status = HttpStatus.BAD_REQUEST;
        } else if (result.getType() == ResultType.NOT_FOUND) {
>>>>>>> f207b3cc9a74d97717a1173998291893c2c816ff
            status = HttpStatus.NOT_FOUND;
        }
        return new ResponseEntity<>(result.getMessages(), status);
    }
<<<<<<< HEAD

=======
>>>>>>> f207b3cc9a74d97717a1173998291893c2c816ff
}
