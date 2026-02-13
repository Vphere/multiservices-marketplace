package com.login.signup.login.signup.repository;

import com.login.signup.login.signup.model.UserBooking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserBookingRepository extends JpaRepository<UserBooking,Long> {
    List<UserBooking> findByUserId(Long id);

    @Query(
            value = """
    SELECT *
    FROM user_booking
    WHERE service_provider_service_id = :serviceId
      AND booked_time = :bookedTime
    """,
            nativeQuery = true
    )
    Optional<UserBooking> findBooking(
            @Param("serviceId") Long serviceId,
            @Param("bookedTime") LocalDateTime bookedTime
    );
}
