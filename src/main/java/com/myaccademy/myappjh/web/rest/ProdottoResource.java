package com.myaccademy.myappjh.web.rest;

import com.myaccademy.myappjh.domain.Prodotto;
import com.myaccademy.myappjh.repository.ProdottoRepository;
import com.myaccademy.myappjh.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.myaccademy.myappjh.domain.Prodotto}.
 */
@RestController
@RequestMapping("/api")
public class ProdottoResource {

    private final Logger log = LoggerFactory.getLogger(ProdottoResource.class);

    private static final String ENTITY_NAME = "prodotto";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ProdottoRepository prodottoRepository;

    public ProdottoResource(ProdottoRepository prodottoRepository) {
        this.prodottoRepository = prodottoRepository;
    }

    /**
     * {@code POST  /prodottos} : Create a new prodotto.
     *
     * @param prodotto the prodotto to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new prodotto, or with status {@code 400 (Bad Request)} if the prodotto has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/prodottos")
    public ResponseEntity<Prodotto> createProdotto(@Valid @RequestBody Prodotto prodotto) throws URISyntaxException {
        log.debug("REST request to save Prodotto : {}", prodotto);
        if (prodotto.getId() != null) {
            throw new BadRequestAlertException("A new prodotto cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Prodotto result = prodottoRepository.save(prodotto);
        return ResponseEntity.created(new URI("/api/prodottos/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /prodottos} : Updates an existing prodotto.
     *
     * @param prodotto the prodotto to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated prodotto,
     * or with status {@code 400 (Bad Request)} if the prodotto is not valid,
     * or with status {@code 500 (Internal Server Error)} if the prodotto couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/prodottos")
    public ResponseEntity<Prodotto> updateProdotto(@Valid @RequestBody Prodotto prodotto) throws URISyntaxException {
        log.debug("REST request to update Prodotto : {}", prodotto);
        if (prodotto.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Prodotto result = prodottoRepository.save(prodotto);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, prodotto.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /prodottos} : get all the prodottos.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of prodottos in body.
     */
    @GetMapping("/prodottos")
    public List<Prodotto> getAllProdottos() {
        log.debug("REST request to get all Prodottos");
        return prodottoRepository.findAll();
    }

    /**
     * {@code GET  /prodottos/:id} : get the "id" prodotto.
     *
     * @param id the id of the prodotto to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the prodotto, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/prodottos/{id}")
    public ResponseEntity<Prodotto> getProdotto(@PathVariable Long id) {
        log.debug("REST request to get Prodotto : {}", id);
        Optional<Prodotto> prodotto = prodottoRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(prodotto);
    }

    /**
     * {@code DELETE  /prodottos/:id} : delete the "id" prodotto.
     *
     * @param id the id of the prodotto to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/prodottos/{id}")
    public ResponseEntity<Void> deleteProdotto(@PathVariable Long id) {
        log.debug("REST request to delete Prodotto : {}", id);
        prodottoRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
