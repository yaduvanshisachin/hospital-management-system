package com.yadavice.youtube.hospitalManagement.cotroller;

import com.yadavice.youtube.hospitalManagement.dto.AppointmentResponseDto;
import com.yadavice.youtube.hospitalManagement.entity.User;
import com.yadavice.youtube.hospitalManagement.repository.DoctorRepository;
import com.yadavice.youtube.hospitalManagement.service.AppointmentService;
import com.yadavice.youtube.hospitalManagement.service.DoctorService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/doctors")
@RequiredArgsConstructor
public class DoctorController {

    private final DoctorService doctorService;
    private final AppointmentService appointmentService;

    @GetMapping("/appointments")
    public ResponseEntity<List<AppointmentResponseDto>> getAllAppointmentsOfDoctor(){
        User user = (User) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ResponseEntity.ok(appointmentService.getAllAppointmentsOfDoctor(user.getId()));
    }
}
