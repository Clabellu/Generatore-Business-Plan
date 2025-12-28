"""
Sistema di gestione crediti per Business Plan Generator

Gestisce l'aggiunta, consumo e verifica dei crediti utente.
Ogni business plan richiede 1 credito del tipo corrispondente (breve o completo).
"""
from database import db
from models import Credit, User
from datetime import datetime


def aggiungi_crediti(user_id, tipo, quantita, order_id=None):
    """
    Aggiunge crediti a un utente.

    Args:
        user_id (int): ID dell'utente
        tipo (str): Tipo di credito ('breve' o 'completo')
        quantita (int): Numero di crediti da aggiungere
        order_id (int, optional): ID dell'ordine associato

    Returns:
        Credit: Oggetto Credit creato

    Raises:
        ValueError: Se tipo non è valido o quantità è negativa
    """
    # Validazione
    if tipo not in ['breve', 'completo']:
        raise ValueError("Tipo deve essere 'breve' o 'completo'")

    if quantita <= 0:
        raise ValueError("La quantità deve essere positiva")

    # Verifica che l'utente esista
    user = User.query.get(user_id)
    if not user:
        raise ValueError(f"Utente con ID {user_id} non trovato")

    # Crea nuovo record crediti
    credito = Credit(
        user_id=user_id,
        tipo=tipo,
        quantita=quantita,
        order_id=order_id,
        created_at=datetime.utcnow()
    )

    db.session.add(credito)
    db.session.commit()

    print(f"✅ Aggiunti {quantita} crediti '{tipo}' all'utente {user.email}")

    return credito


def consuma_credito(user_id, tipo):
    """
    Consuma 1 credito di un certo tipo per l'utente.

    Args:
        user_id (int): ID dell'utente
        tipo (str): Tipo di credito da consumare ('breve' o 'completo')

    Returns:
        bool: True se il credito è stato consumato, False altrimenti

    Raises:
        ValueError: Se tipo non è valido
        Exception: Se l'utente non ha crediti sufficienti
    """
    # Validazione
    if tipo not in ['breve', 'completo']:
        raise ValueError("Tipo deve essere 'breve' o 'completo'")

    # Verifica che l'utente abbia crediti
    user = User.query.get(user_id)
    if not user:
        raise ValueError(f"Utente con ID {user_id} non trovato")

    crediti_disponibili = user.get_credits(tipo)

    if crediti_disponibili < 1:
        raise Exception(f"Crediti insufficienti. Disponibili: {crediti_disponibili}, richiesti: 1")

    # Consuma il credito (aggiungi -1)
    credito_negativo = Credit(
        user_id=user_id,
        tipo=tipo,
        quantita=-1,  # Consumo = quantità negativa
        created_at=datetime.utcnow()
    )

    db.session.add(credito_negativo)
    db.session.commit()

    print(f"✅ Consumato 1 credito '{tipo}' per utente {user.email}")
    print(f"   Crediti rimanenti: {user.get_credits(tipo)}")

    return True


def verifica_crediti(user_id, tipo, quantita_richiesta=1):
    """
    Verifica se un utente ha crediti sufficienti.

    Args:
        user_id (int): ID dell'utente
        tipo (str): Tipo di credito ('breve' o 'completo')
        quantita_richiesta (int): Numero di crediti necessari

    Returns:
        dict: {
            'ha_crediti': bool,
            'disponibili': int,
            'richiesti': int,
            'mancanti': int
        }
    """
    user = User.query.get(user_id)
    if not user:
        return {
            'ha_crediti': False,
            'disponibili': 0,
            'richiesti': quantita_richiesta,
            'mancanti': quantita_richiesta
        }

    crediti_disponibili = user.get_credits(tipo)
    ha_crediti = crediti_disponibili >= quantita_richiesta
    mancanti = max(0, quantita_richiesta - crediti_disponibili)

    return {
        'ha_crediti': ha_crediti,
        'disponibili': crediti_disponibili,
        'richiesti': quantita_richiesta,
        'mancanti': mancanti
    }


def get_storico_crediti(user_id, tipo=None, limit=None):
    """
    Ottiene lo storico dei movimenti crediti di un utente.

    Args:
        user_id (int): ID dell'utente
        tipo (str, optional): Filtra per tipo ('breve' o 'completo')
        limit (int, optional): Numero massimo di record da restituire

    Returns:
        list: Lista di oggetti Credit ordinati per data (più recenti prima)
    """
    query = Credit.query.filter_by(user_id=user_id)

    if tipo:
        if tipo not in ['breve', 'completo']:
            raise ValueError("Tipo deve essere 'breve' o 'completo'")
        query = query.filter_by(tipo=tipo)

    query = query.order_by(Credit.created_at.desc())

    if limit:
        query = query.limit(limit)

    return query.all()


def get_pacchetti_crediti():
    """
    Restituisce i pacchetti di crediti disponibili per l'acquisto.

    Returns:
        list: Lista di dizionari con informazioni sui pacchetti
    """
    pacchetti = [
        {
            'id': 'breve_singolo',
            'nome': 'Business Plan Breve',
            'tipo': 'breve',
            'quantita': 1,
            'prezzo': 29.90,
            'prezzo_unitario': 29.90,
            'risparmio': 0,
            'descrizione': '1 Business Plan Breve (max 5 pagine)',
            'popolare': False
        },
        {
            'id': 'completo_singolo',
            'nome': 'Business Plan Completo',
            'tipo': 'completo',
            'quantita': 1,
            'prezzo': 59.90,
            'prezzo_unitario': 59.90,
            'risparmio': 0,
            'descrizione': '1 Business Plan Completo (15-20 pagine)',
            'popolare': True
        },
        {
            'id': 'breve_pack10',
            'nome': 'Pack 10 Business Plan Brevi',
            'tipo': 'breve',
            'quantita': 10,
            'prezzo': 249.00,
            'prezzo_unitario': 24.90,
            'risparmio': 50.00,  # Risparmio di €5 per BP
            'descrizione': '10 Business Plan Brevi - Risparmia €50!',
            'popolare': False
        },
        {
            'id': 'completo_pack10',
            'nome': 'Pack 10 Business Plan Completi',
            'tipo': 'completo',
            'quantita': 10,
            'prezzo': 499.00,
            'prezzo_unitario': 49.90,
            'risparmio': 100.00,  # Risparmio di €10 per BP
            'descrizione': '10 Business Plan Completi - Risparmia €100!',
            'popolare': False
        }
    ]

    return pacchetti


def get_pacchetto_by_id(pacchetto_id):
    """
    Ottiene un pacchetto specifico per ID.

    Args:
        pacchetto_id (str): ID del pacchetto

    Returns:
        dict: Informazioni sul pacchetto, None se non trovato
    """
    pacchetti = get_pacchetti_crediti()

    for pacchetto in pacchetti:
        if pacchetto['id'] == pacchetto_id:
            return pacchetto

    return None


def calcola_totale_crediti_acquistati(user_id):
    """
    Calcola il totale dei crediti acquistati (positivi) per un utente.

    Args:
        user_id (int): ID dell'utente

    Returns:
        dict: {'brevi': int, 'completi': int, 'totale': int}
    """
    crediti_brevi = db.session.query(db.func.sum(Credit.quantita)).filter(
        Credit.user_id == user_id,
        Credit.tipo == 'breve',
        Credit.quantita > 0  # Solo acquisti, non consumi
    ).scalar() or 0

    crediti_completi = db.session.query(db.func.sum(Credit.quantita)).filter(
        Credit.user_id == user_id,
        Credit.tipo == 'completo',
        Credit.quantita > 0
    ).scalar() or 0

    return {
        'brevi': int(crediti_brevi),
        'completi': int(crediti_completi),
        'totale': int(crediti_brevi + crediti_completi)
    }


def calcola_totale_crediti_consumati(user_id):
    """
    Calcola il totale dei crediti consumati (negativi) per un utente.

    Args:
        user_id (int): ID dell'utente

    Returns:
        dict: {'brevi': int, 'completi': int, 'totale': int}
    """
    crediti_brevi = db.session.query(db.func.sum(Credit.quantita)).filter(
        Credit.user_id == user_id,
        Credit.tipo == 'breve',
        Credit.quantita < 0  # Solo consumi
    ).scalar() or 0

    crediti_completi = db.session.query(db.func.sum(Credit.quantita)).filter(
        Credit.user_id == user_id,
        Credit.tipo == 'completo',
        Credit.quantita < 0
    ).scalar() or 0

    return {
        'brevi': abs(int(crediti_brevi)),  # Valore assoluto per avere numero positivo
        'completi': abs(int(crediti_completi)),
        'totale': abs(int(crediti_brevi + crediti_completi))
    }
