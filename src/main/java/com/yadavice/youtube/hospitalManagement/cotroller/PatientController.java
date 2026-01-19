package com.yadavice.youtube.hospitalManagement.cotroller;

import com.yadavice.youtube.hospitalManagement.dto.AppointmentResponseDto;
import com.yadavice.youtube.hospitalManagement.dto.CreateAppointmentRequestDto;
import com.yadavice.youtube.hospitalManagement.service.AppointmentService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/patients")
@RequiredArgsConstructor
public class PatientController {
    private final AppointmentService appointmentService;

    public ResponseEntity<AppointmentResponseDto> createNewAppointment(@RequestBody CreateAppointmentRequestDto createAppointmentRequestDto){
        return ResponseEntity.status(HttpStatus.CREATED).body(appointmentService.createNewAppointment(createAppointmentRequestDto));
    }
}
