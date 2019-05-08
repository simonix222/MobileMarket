package com.myaccademy.myappjh.web.rest;

import com.myaccademy.myappjh.domain.Ordinazione;
import com.myaccademy.myappjh.repository.OrdinazioneRepository;
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
 * REST controller for managing {@link com.myaccademy.myappjh.domain.Ordinazione}.
 */
@RestController
@RequestMapping("/api")
public class OrdinazioneResource {

    private final Logger log = LoggerFactory.getLogger(OrdinazioneResource.class);

    private static final String ENTITY_NAME = "ordinazione";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OrdinazioneRepository ordinazioneRepository;

    public OrdinazioneResource(OrdinazioneRepository ordinazioneRepository) {
        this.ordinazioneRepository = ordinazioneRepository;
    }

    /**
     * {@code POST  /ordinaziones} : Create a new ordinazione.
     *
     * @param ordinazione the ordinazione to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ordinazione, or with status {@code 400 (Bad Request)} if the ordinazione has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ordinaziones")
    public ResponseEntity<Ordinazione> createOrdinazione(@Valid @RequestBody Ordinazione ordinazione) throws URISyntaxException {
        log.debug("REST request to save Ordinazione : {}", ordinazione);
        if (ordinazione.getId() != null) {
            throw new BadRequestAlertException("A new ordinazione cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ordinazione result = ordinazioneRepository.save(ordinazione);
        return ResponseEntity.created(new URI("/api/ordinaziones/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, true, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ordinaziones} : Updates an existing ordinazione.
     *
     * @param ordinazione the ordinazione to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ordinazione,
     * or with status {@code 400 (Bad Request)} if the ordinazione is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ordinazione couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ordinaziones")
    public ResponseEntity<Ordinazione> updateOrdinazione(@Valid @RequestBody Ordinazione ordinazione) throws URISyntaxException {
        log.debug("REST request to update Ordinazione : {}", ordinazione);
        if (ordinazione.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ordinazione result = ordinazioneRepository.save(ordinazione);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, true, ENTITY_NAME, ordinazione.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ordinaziones} : get all the ordinaziones.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ordinaziones in body.
     */
    @GetMapping("/ordinaziones")
    public List<Ordinazione> getAllOrdinaziones() {
        log.debug("REST request to get all Ordinaziones");
        return ordinazioneRepository.findAll();
    }

    /**
     * {@code GET  /ordinaziones/:id} : get the "id" ordinazione.
     *
     * @param id the id of the ordinazione to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ordinazione, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ordinaziones/{id}")
    public ResponseEntity<Ordinazione> getOrdinazione(@PathVariable Long id) {
        log.debug("REST request to get Ordinazione : {}", id);
        Optional<Ordinazione> ordinazione = ordinazioneRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ordinazione);
    }

    /**
     * {@code DELETE  /ordinaziones/:id} : delete the "id" ordinazione.
     *
     * @param id the id of the ordinazione to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ordinaziones/{id}")
    public ResponseEntity<Void> deleteOrdinazione(@PathVariable Long id) {
        log.debug("REST request to delete Ordinazione : {}", id);
        ordinazioneRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, true, ENTITY_NAME, id.toString())).build();
    }
}
