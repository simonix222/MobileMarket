package com.myaccademy.myappjh.web.rest;

import com.myaccademy.myappjh.MobileMarketApp;
import com.myaccademy.myappjh.domain.CategoriaProdotto;
import com.myaccademy.myappjh.repository.CategoriaProdottoRepository;
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
import java.util.List;

import static com.myaccademy.myappjh.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@Link CategoriaProdottoResource} REST controller.
 */
@SpringBootTest(classes = MobileMarketApp.class)
public class CategoriaProdottoResourceIT {

    private static final String DEFAULT_NOME = "AAAAAAAAAA";
    private static final String UPDATED_NOME = "BBBBBBBBBB";

    private static final String DEFAULT_DESCRIZIONE = "AAAAAAAAAA";
    private static final String UPDATED_DESCRIZIONE = "BBBBBBBBBB";

    @Autowired
    private CategoriaProdottoRepository categoriaProdottoRepository;

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

    private MockMvc restCategoriaProdottoMockMvc;

    private CategoriaProdotto categoriaProdotto;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final CategoriaProdottoResource categoriaProdottoResource = new CategoriaProdottoResource(categoriaProdottoRepository);
        this.restCategoriaProdottoMockMvc = MockMvcBuilders.standaloneSetup(categoriaProdottoResource)
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
    public static CategoriaProdotto createEntity(EntityManager em) {
        CategoriaProdotto categoriaProdotto = new CategoriaProdotto()
            .nome(DEFAULT_NOME)
            .descrizione(DEFAULT_DESCRIZIONE);
        return categoriaProdotto;
    }

    @BeforeEach
    public void initTest() {
        categoriaProdotto = createEntity(em);
    }

    @Test
    @Transactional
    public void createCategoriaProdotto() throws Exception {
        int databaseSizeBeforeCreate = categoriaProdottoRepository.findAll().size();

        // Create the CategoriaProdotto
        restCategoriaProdottoMockMvc.perform(post("/api/categoria-prodottos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoriaProdotto)))
            .andExpect(status().isCreated());

        // Validate the CategoriaProdotto in the database
        List<CategoriaProdotto> categoriaProdottoList = categoriaProdottoRepository.findAll();
        assertThat(categoriaProdottoList).hasSize(databaseSizeBeforeCreate + 1);
        CategoriaProdotto testCategoriaProdotto = categoriaProdottoList.get(categoriaProdottoList.size() - 1);
        assertThat(testCategoriaProdotto.getNome()).isEqualTo(DEFAULT_NOME);
        assertThat(testCategoriaProdotto.getDescrizione()).isEqualTo(DEFAULT_DESCRIZIONE);
    }

    @Test
    @Transactional
    public void createCategoriaProdottoWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = categoriaProdottoRepository.findAll().size();

        // Create the CategoriaProdotto with an existing ID
        categoriaProdotto.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restCategoriaProdottoMockMvc.perform(post("/api/categoria-prodottos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoriaProdotto)))
            .andExpect(status().isBadRequest());

        // Validate the CategoriaProdotto in the database
        List<CategoriaProdotto> categoriaProdottoList = categoriaProdottoRepository.findAll();
        assertThat(categoriaProdottoList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void checkNomeIsRequired() throws Exception {
        int databaseSizeBeforeTest = categoriaProdottoRepository.findAll().size();
        // set the field null
        categoriaProdotto.setNome(null);

        // Create the CategoriaProdotto, which fails.

        restCategoriaProdottoMockMvc.perform(post("/api/categoria-prodottos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoriaProdotto)))
            .andExpect(status().isBadRequest());

        List<CategoriaProdotto> categoriaProdottoList = categoriaProdottoRepository.findAll();
        assertThat(categoriaProdottoList).hasSize(databaseSizeBeforeTest);
    }

    @Test
    @Transactional
    public void getAllCategoriaProdottos() throws Exception {
        // Initialize the database
        categoriaProdottoRepository.saveAndFlush(categoriaProdotto);

        // Get all the categoriaProdottoList
        restCategoriaProdottoMockMvc.perform(get("/api/categoria-prodottos?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(categoriaProdotto.getId().intValue())))
            .andExpect(jsonPath("$.[*].nome").value(hasItem(DEFAULT_NOME.toString())))
            .andExpect(jsonPath("$.[*].descrizione").value(hasItem(DEFAULT_DESCRIZIONE.toString())));
    }
    
    @Test
    @Transactional
    public void getCategoriaProdotto() throws Exception {
        // Initialize the database
        categoriaProdottoRepository.saveAndFlush(categoriaProdotto);

        // Get the categoriaProdotto
        restCategoriaProdottoMockMvc.perform(get("/api/categoria-prodottos/{id}", categoriaProdotto.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(categoriaProdotto.getId().intValue()))
            .andExpect(jsonPath("$.nome").value(DEFAULT_NOME.toString()))
            .andExpect(jsonPath("$.descrizione").value(DEFAULT_DESCRIZIONE.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingCategoriaProdotto() throws Exception {
        // Get the categoriaProdotto
        restCategoriaProdottoMockMvc.perform(get("/api/categoria-prodottos/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateCategoriaProdotto() throws Exception {
        // Initialize the database
        categoriaProdottoRepository.saveAndFlush(categoriaProdotto);

        int databaseSizeBeforeUpdate = categoriaProdottoRepository.findAll().size();

        // Update the categoriaProdotto
        CategoriaProdotto updatedCategoriaProdotto = categoriaProdottoRepository.findById(categoriaProdotto.getId()).get();
        // Disconnect from session so that the updates on updatedCategoriaProdotto are not directly saved in db
        em.detach(updatedCategoriaProdotto);
        updatedCategoriaProdotto
            .nome(UPDATED_NOME)
            .descrizione(UPDATED_DESCRIZIONE);

        restCategoriaProdottoMockMvc.perform(put("/api/categoria-prodottos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedCategoriaProdotto)))
            .andExpect(status().isOk());

        // Validate the CategoriaProdotto in the database
        List<CategoriaProdotto> categoriaProdottoList = categoriaProdottoRepository.findAll();
        assertThat(categoriaProdottoList).hasSize(databaseSizeBeforeUpdate);
        CategoriaProdotto testCategoriaProdotto = categoriaProdottoList.get(categoriaProdottoList.size() - 1);
        assertThat(testCategoriaProdotto.getNome()).isEqualTo(UPDATED_NOME);
        assertThat(testCategoriaProdotto.getDescrizione()).isEqualTo(UPDATED_DESCRIZIONE);
    }

    @Test
    @Transactional
    public void updateNonExistingCategoriaProdotto() throws Exception {
        int databaseSizeBeforeUpdate = categoriaProdottoRepository.findAll().size();

        // Create the CategoriaProdotto

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restCategoriaProdottoMockMvc.perform(put("/api/categoria-prodottos")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(categoriaProdotto)))
            .andExpect(status().isBadRequest());

        // Validate the CategoriaProdotto in the database
        List<CategoriaProdotto> categoriaProdottoList = categoriaProdottoRepository.findAll();
        assertThat(categoriaProdottoList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteCategoriaProdotto() throws Exception {
        // Initialize the database
        categoriaProdottoRepository.saveAndFlush(categoriaProdotto);

        int databaseSizeBeforeDelete = categoriaProdottoRepository.findAll().size();

        // Delete the categoriaProdotto
        restCategoriaProdottoMockMvc.perform(delete("/api/categoria-prodottos/{id}", categoriaProdotto.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database is empty
        List<CategoriaProdotto> categoriaProdottoList = categoriaProdottoRepository.findAll();
        assertThat(categoriaProdottoList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(CategoriaProdotto.class);
        CategoriaProdotto categoriaProdotto1 = new CategoriaProdotto();
        categoriaProdotto1.setId(1L);
        CategoriaProdotto categoriaProdotto2 = new CategoriaProdotto();
        categoriaProdotto2.setId(categoriaProdotto1.getId());
        assertThat(categoriaProdotto1).isEqualTo(categoriaProdotto2);
        categoriaProdotto2.setId(2L);
        assertThat(categoriaProdotto1).isNotEqualTo(categoriaProdotto2);
        categoriaProdotto1.setId(null);
        assertThat(categoriaProdotto1).isNotEqualTo(categoriaProdotto2);
    }
}
