package com.appointmenthostpital.server.handlers;

import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.appointmenthostpital.server.dtos.RestResponse;
import com.appointmenthostpital.server.exceptions.DuplicateResourceException;
import com.appointmenthostpital.server.exceptions.PasswordNotValidException;
import com.appointmenthostpital.server.utils.HttpStatusResponse;

@RestControllerAdvice
public class GlobalExceptionHandler {
    // Server Error, RuntimeException is Exception's subclass. error in client or server
    @ExceptionHandler(value = {
            IllegalArgumentException.class,
            UsernameNotFoundException.class,
            BadCredentialsException.class
    })
    public ResponseEntity<RestResponse<?>> serverExceptionHandler(Exception exception) {

        RestResponse<Object> restResponse = new RestResponse<>();
        restResponse.setStatusCode(HttpStatusResponse.INTERNAL_SERVER_ERROR);
        restResponse.setResult(false);
        restResponse.setData(null);
        restResponse.setMessage(HttpStatusResponse.BAD_MESSAGE);
        restResponse.setErrorMessage(HttpStatusResponse.INTERNAL_MESSAGE);

        return ResponseEntity.status(HttpStatusResponse.INTERNAL_SERVER_ERROR).body(restResponse);
    }

    // Client Error
    @ExceptionHandler(value = {
            PasswordNotValidException.class,
            DuplicateResourceException.class
    })
    public ResponseEntity<RestResponse<?>> clientExceptionHandler(Exception exception) {
        RestResponse<Object> restResponse = new RestResponse<>();
        restResponse.setStatusCode(HttpStatusResponse.BAD_REQUEST);
        restResponse.setResult(false);
        restResponse.setData(null);
        restResponse.setMessage(HttpStatusResponse.BAD_MESSAGE);
        restResponse.setErrorMessage(exception.getMessage());

        return ResponseEntity.status(HttpStatusResponse.BAD_REQUEST).body(restResponse);
    }
}
