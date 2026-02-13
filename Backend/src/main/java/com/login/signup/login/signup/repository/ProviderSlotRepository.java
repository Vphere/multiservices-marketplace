package com.login.signup.login.signup.repository;

import com.login.signup.login.signup.dto.ProviderSlotDto;
import com.login.signup.login.signup.model.ProviderSlot;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface ProviderSlotRepository extends JpaRepository<ProviderSlot,Long> {

    List<ProviderSlot> findByProviderServiceId(Long id);

//    @Modifying
//    @Transactional
//    @Query(
//            value = """
//    DELETE FROM provider_slot
//    WHERE provider_service_id = :serviceId
//      AND UNIX_TIMESTAMP(slot_start) = :epochSeconds
//    """,
//            nativeQuery = true
//    )
//    void deleteByProviderServiceIdAndDate(
//            @Param("serviceId") Long serviceId,
//            @Param("epochSeconds") long epochSeconds
//    );
}
