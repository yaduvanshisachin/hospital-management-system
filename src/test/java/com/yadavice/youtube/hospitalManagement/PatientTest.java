package com.yadavice.youtube.hospitalManagement;

import com.yadavice.youtube.hospitalManagement.entity.Patient;
import com.yadavice.youtube.hospitalManagement.repository.PatientRepository;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

@SpringBootTest
public class PatientTest {
    @Autowired
    private PatientRepository patientRepository;

    @Test
    public void testPatientRepository(){

        List<Patient> patientList = patientRepository.findAll();
//        System.out.println(patientList);
//
//        Patient p1 = new Patient();
//
//        patientRepository.save(p1);

//        List<Patient> patients = patientRepository.findAllPatients();
    }




    @Test
    public void testTransactionMethods(){
        Patient patient = patientRepository.findByName("Diya Patel");
    }

}

