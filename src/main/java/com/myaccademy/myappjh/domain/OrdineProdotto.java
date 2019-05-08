package com.myaccademy.myappjh.domain;


import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.time.Instant;
import java.util.HashSet;
import java.util.Set;
import java.util.Objects;

import com.myaccademy.myappjh.domain.enumeration.StatoOrdine;

/**
 * A OrdineProdotto.
 */
@Entity
@Table(name = "ordine_prodotto")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class OrdineProdotto implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Column(name = "data_inserimento", nullable = false)
    private Instant dataInserimento;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "stato", nullable = false)
    private StatoOrdine stato;

    @NotNull
    @Column(name = "codice", nullable = false)
    private String codice;

    @OneToMany(mappedBy = "ordine")
    @Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
    private Set<Ordinazione> ordinaziones = new HashSet<>();

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("ordines")
    private Cliente cliente;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Instant getDataInserimento() {
        return dataInserimento;
    }

    public OrdineProdotto dataInserimento(Instant dataInserimento) {
        this.dataInserimento = dataInserimento;
        return this;
    }

    public void setDataInserimento(Instant dataInserimento) {
        this.dataInserimento = dataInserimento;
    }

    public StatoOrdine getStato() {
        return stato;
    }

    public OrdineProdotto stato(StatoOrdine stato) {
        this.stato = stato;
        return this;
    }

    public void setStato(StatoOrdine stato) {
        this.stato = stato;
    }

    public String getCodice() {
        return codice;
    }

    public OrdineProdotto codice(String codice) {
        this.codice = codice;
        return this;
    }

    public void setCodice(String codice) {
        this.codice = codice;
    }

    public Set<Ordinazione> getOrdinaziones() {
        return ordinaziones;
    }

    public OrdineProdotto ordinaziones(Set<Ordinazione> ordinaziones) {
        this.ordinaziones = ordinaziones;
        return this;
    }

    public OrdineProdotto addOrdinazione(Ordinazione ordinazione) {
        this.ordinaziones.add(ordinazione);
        ordinazione.setOrdine(this);
        return this;
    }

    public OrdineProdotto removeOrdinazione(Ordinazione ordinazione) {
        this.ordinaziones.remove(ordinazione);
        ordinazione.setOrdine(null);
        return this;
    }

    public void setOrdinaziones(Set<Ordinazione> ordinaziones) {
        this.ordinaziones = ordinaziones;
    }

    public Cliente getCliente() {
        return cliente;
    }

    public OrdineProdotto cliente(Cliente cliente) {
        this.cliente = cliente;
        return this;
    }

    public void setCliente(Cliente cliente) {
        this.cliente = cliente;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof OrdineProdotto)) {
            return false;
        }
        return id != null && id.equals(((OrdineProdotto) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "OrdineProdotto{" +
            "id=" + getId() +
            ", dataInserimento='" + getDataInserimento() + "'" +
            ", stato='" + getStato() + "'" +
            ", codice='" + getCodice() + "'" +
            "}";
    }
}
