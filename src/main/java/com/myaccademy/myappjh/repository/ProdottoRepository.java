package com.myaccademy.myappjh.repository;

import com.myaccademy.myappjh.domain.Prodotto;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Prodotto entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ProdottoRepository extends JpaRepository<Prodotto, Long> {

}
