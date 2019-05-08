package com.myaccademy.myappjh.web.rest;

import com.myaccademy.myappjh.MobileMarketApp;
import com.myaccademy.myappjh.domain.Ordinazione;
import com.myaccademy.myappjh.domain.Prodotto;
import com.myaccademy.myappjh.domain.OrdineProdotto;
import com.myaccademy.myappjh.repository.OrdinazioneRepository;
import com.myaccademy.myappjh.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.math.BigDecimal;
import java.util.List;

import static com.myaccademy.myappjh.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

import com.myaccademy.myappjh.domain.enumeration.Magazzino;
/**
 * Integration tests for the {@Link OrdinazioneResource} REST controller.
 */
@SpringBootTest(classes = MobileMarketApp.class)
public class OrdinazioneResourceIT {

    private static final Integer DEFAULT_QUANTITA = 0;
    private static final Integer UPDATED_QUANTITA = 1;

    private static final BigDecimal DEFAULT_PREZZO_TOTALE = new BigDecimal(0);
    private static final BigDecimal UPDATED_PREZZO_TOTALE = new BigDecimal(1);

    private static final Magazzino DEFAULT_STATO = Magazzino.DISPONIBILE;
    private static final Magazzino UPDATED_STATO = Magazzino.NON_DISPONIBILE;

    @Autowired
    private OrdinazioneRepository ordinazioneRepository;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restOrdinazioneMockMvc;

    private Ordinazione ordinazione;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final OrdinazioneResource ordinazioneResource = new OrdinazioneResource(ordinazioneRepository);
        this.restOrdinazioneMockMvc = MockMvcBuilders.standaloneSetup(ordinazioneResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ordinazione createEntity(EntityManager em) {
        Ordinazione ordinazione = new Ordinazione()
            .quantita(DEFAULT_QUANTITA)
            .prezzoTotale(DEFAULT_PREZZO_TOTALE)
            .stato(DEFAULT_STATO);
        // Add required entity
        Prodotto prodotto = ProdottoResourceIT.createEntity(em);
        em.persist(prodotto);
        em.flush();
        ordinazione.setProdotto(prodotto);
        // Add required entity
        OrdineProdotto ordineProdotto = OrdineProdottoResourceIT.createEntity(em);
        em.persist(ordineProdotto);
        em.flush();
        ordinazione.setOrdine(ordineProdotto);
        return ordinazione;
    }

    @BeforeEach
    public void initTest() {
        ordinazione = createEntity(em);
    }

    @Test
    @Transactional
    public void createOrdinazione() throws Exception {
        int databaseSizeBeforeCreate = ordinazioneRepository.findAll().size();

        // Create the Ordinazione
        restOrdinazioneMockMvc.perform(post("/api/ordinaziones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordinazione)))
            .andExpect(status().isCreated());

        // Validate the Ordinazione in the database
        List<Ordinazione> ordinazioneList = ordinazioneRepository.findAll();
        assertThat(ordinazioneList).hasSize(databaseSizeBeforeCreate + 1);
        Ordinazione testOrdinazione = ordinazioneList.get(ordinazioneList.size() - 1);
        assertThat(testOrdinazione.getQuantita()).isEqualTo(DEFAULT_QUANTITA);
        assertThat(testOrdinazione.getPrezzoTotale()).isEqualTo(DEFAULT_PREZZO_TOTALE);
        assertThat(testOrdinazione.getStato()).isEqualTo(DEFAULT_STATO);
    }

    @Test
    @Transactional
    public void createOrdinazioneWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ordinazioneRepository.findAll().size();

        // Create the Ordinazione with an existing ID
        ordinazione.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOrdinazioneMockMvc.perform(post("/api/ordinaziones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordinazione)))
            .andExpect(status().isBadRequest());

        // Validate the Ordinazione in the database
        List<Ordinazione> ordinazioneList = ordinazioneRepository.findAll();
        assertThat(ordinazioneList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkQuantitaIsRequired() throws Exception {
        int databaseSizeBeforeTest = ordinazioneRepository.findAll().size();
        // set the field null
        ordinazione.setQuantita(null);

        // Create the Ordinazione, which fails.

        restOrdinazioneMockMvc.perform(post("/api/ordinaziones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordinazione)))
            .andExpect(status().isBadRequest());

        List<Ordinazione> ordinazioneList = ordinazioneRepository.findAll();
        assertThat(ordinazioneList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkPrezzoTotaleIsRequired() throws Exception {
        int databaseSizeBeforeTest = ordinazioneRepository.findAll().size();
        // set the field null
        ordinazione.setPrezzoTotale(null);

        // Create the Ordinazione, which fails.

        restOrdinazioneMockMvc.perform(post("/api/ordinaziones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordinazione)))
            .andExpect(status().isBadRequest());

        List<Ordinazione> ordinazioneList = ordinazioneRepository.findAll();
        assertThat(ordinazioneList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void checkStatoIsRequired() throws Exception {
        int databaseSizeBeforeTest = ordinazioneRepository.findAll().size();
        // set the field null
        ordinazione.setStato(null);

        // Create the Ordinazione, which fails.

        restOrdinazioneMockMvc.perform(post("/api/ordinaziones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordinazione)))
            .andExpect(status().isBadRequest());

        List<Ordinazione> ordinazioneList = ordinazioneRepository.findAll();
        assertThat(ordinazioneList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllOrdinaziones() throws Exception {
        // Initialize the database
        ordinazioneRepository.saveAndFlush(ordinazione);

        // Get all the ordinazioneList
        restOrdinazioneMockMvc.perform(get("/api/ordinaziones?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ordinazione.getId().intValue())))
            .andExpect(jsonPath("$.[*].quantita").value(hasItem(DEFAULT_QUANTITA)))
            .andExpect(jsonPath("$.[*].prezzoTotale").value(hasItem(DEFAULT_PREZZO_TOTALE.intValue())))
            .andExpect(jsonPath("$.[*].stato").value(hasItem(DEFAULT_STATO.toString())));
    }
    
    @Test
    @Transactional
    public void getOrdinazione() throws Exception {
        // Initialize the database
        ordinazioneRepository.saveAndFlush(ordinazione);

        // Get the ordinazione
        restOrdinazioneMockMvc.perform(get("/api/ordinaziones/{id}", ordinazione.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(ordinazione.getId().intValue()))
            .andExpect(jsonPath("$.quantita").value(DEFAULT_QUANTITA))
            .andExpect(jsonPath("$.prezzoTotale").value(DEFAULT_PREZZO_TOTALE.intValue()))
            .andExpect(jsonPath("$.stato").value(DEFAULT_STATO.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingOrdinazione() throws Exception {
        // Get the ordinazione
        restOrdinazioneMockMvc.perform(get("/api/ordinaziones/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOrdinazione() throws Exception {
        // Initialize the database
        ordinazioneRepository.saveAndFlush(ordinazione);

        int databaseSizeBeforeUpdate = ordinazioneRepository.findAll().size();

        // Update the ordinazione
        Ordinazione updatedOrdinazione = ordinazioneRepository.findById(ordinazione.getId()).get();
        // Disconnect from session so that the updates on updatedOrdinazione are not directly saved in db
        em.detach(updatedOrdinazione);
        updatedOrdinazione
            .quantita(UPDATED_QUANTITA)
            .prezzoTotale(UPDATED_PREZZO_TOTALE)
            .stato(UPDATED_STATO);

        restOrdinazioneMockMvc.perform(put("/api/ordinaziones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedOrdinazione)))
            .andExpect(status().isOk());

        // Validate the Ordinazione in the database
        List<Ordinazione> ordinazioneList = ordinazioneRepository.findAll();
        assertThat(ordinazioneList).hasSize(databaseSizeBeforeUpdate);
        Ordinazione testOrdinazione = ordinazioneList.get(ordinazioneList.size() - 1);
        assertThat(testOrdinazione.getQuantita()).isEqualTo(UPDATED_QUANTITA);
        assertThat(testOrdinazione.getPrezzoTotale()).isEqualTo(UPDATED_PREZZO_TOTALE);
        assertThat(testOrdinazione.getStato()).isEqualTo(UPDATED_STATO);
    }

    @Test
    @Transactional
    public void updateNonExistingOrdinazione() throws Exception {
        int databaseSizeBeforeUpdate = ordinazioneRepository.findAll().size();

        // Create the Ordinazione

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOrdinazioneMockMvc.perform(put("/api/ordinaziones")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(ordinazione)))
            .andExpect(status().isBadRequest());

        // Validate the Ordinazione in the database
        List<Ordinazione> ordinazioneList = ordinazioneRepository.findAll();
        assertThat(ordinazioneList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOrdinazione() throws Exception {
        // Initialize the database
        ordinazioneRepository.saveAndFlush(ordinazione);

        int databaseSizeBeforeDelete = ordinazioneRepository.findAll().size();

        // Delete the ordinazione
        restOrdinazioneMockMvc.perform(delete("/api/ordinaziones/{id}", ordinazione.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<Ordinazione> ordinazioneList = ordinazioneRepository.findAll();
        assertThat(ordinazioneList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ordinazione.class);
        Ordinazione ordinazione1 = new Ordinazione();
        ordinazione1.setId(1L);
        Ordinazione ordinazione2 = new Ordinazione();
        ordinazione2.setId(ordinazione1.getId());
        assertThat(ordinazione1).isEqualTo(ordinazione2);
        ordinazione2.setId(2L);
        assertThat(ordinazione1).isNotEqualTo(ordinazione2);
        ordinazione1.setId(null);
        assertThat(ordinazione1).isNotEqualTo(ordinazione2);
    }
}
