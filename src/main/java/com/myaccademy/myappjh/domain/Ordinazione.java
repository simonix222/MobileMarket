package com.myaccademy.myappjh.domain;


import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import org.hibernate.annotations.Cache;
import org.hibernate.annotations.CacheConcurrencyStrategy;

import javax.persistence.*;
import javax.validation.constraints.*;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Objects;

import com.myaccademy.myappjh.domain.enumeration.Magazzino;

/**
 * A Ordinazione.
 */
@Entity
@Table(name = "ordinazione")
@Cache(usage = CacheConcurrencyStrategy.NONSTRICT_READ_WRITE)
public class Ordinazione implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @NotNull
    @Min(value = 0)
    @Column(name = "quantita", nullable = false)
    private Integer quantita;

    @NotNull
    @DecimalMin(value = "0")
    @Column(name = "prezzo_totale", precision = 21, scale = 2, nullable = false)
    private BigDecimal prezzoTotale;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "stato", nullable = false)
    private Magazzino stato;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("ordinaziones")
    private Prodotto prodotto;

    @ManyToOne(optional = false)
    @NotNull
    @JsonIgnoreProperties("ordinaziones")
    private OrdineProdotto ordine;

    // jhipster-needle-entity-add-field - JHipster will add fields here, do not remove
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Integer getQuantita() {
        return quantita;
    }

    public Ordinazione quantita(Integer quantita) {
        this.quantita = quantita;
        return this;
    }

    public void setQuantita(Integer quantita) {
        this.quantita = quantita;
    }

    public BigDecimal getPrezzoTotale() {
        return prezzoTotale;
    }

    public Ordinazione prezzoTotale(BigDecimal prezzoTotale) {
        this.prezzoTotale = prezzoTotale;
        return this;
    }

    public void setPrezzoTotale(BigDecimal prezzoTotale) {
        this.prezzoTotale = prezzoTotale;
    }

    public Magazzino getStato() {
        return stato;
    }

    public Ordinazione stato(Magazzino stato) {
        this.stato = stato;
        return this;
    }

    public void setStato(Magazzino stato) {
        this.stato = stato;
    }

    public Prodotto getProdotto() {
        return prodotto;
    }

    public Ordinazione prodotto(Prodotto prodotto) {
        this.prodotto = prodotto;
        return this;
    }

    public void setProdotto(Prodotto prodotto) {
        this.prodotto = prodotto;
    }

    public OrdineProdotto getOrdine() {
        return ordine;
    }

    public Ordinazione ordine(OrdineProdotto ordineProdotto) {
        this.ordine = ordineProdotto;
        return this;
    }

    public void setOrdine(OrdineProdotto ordineProdotto) {
        this.ordine = ordineProdotto;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here, do not remove

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Ordinazione)) {
            return false;
        }
        return id != null && id.equals(((Ordinazione) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    @Override
    public String toString() {
        return "Ordinazione{" +
            "id=" + getId() +
            ", quantita=" + getQuantita() +
            ", prezzoTotale=" + getPrezzoTotale() +
            ", stato='" + getStato() + "'" +
            "}";
    }
}
