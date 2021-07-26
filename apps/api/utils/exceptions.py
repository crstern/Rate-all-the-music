"""
Authorization and NotFound related exceptions
"""


class AuthError(Exception):
    """
    Authorization exceptions class
    """
    def __init__(self, error, status_code):
        """
        Authorization exception constructor
        """
        super().__init__()
        self.error = error
        self.status_code = status_code


class NotFound(Exception):
    """
    *404* `Not Found`

    Raise if a resource does not exist and never existed.
    """

    def __init__(self, error):
        """
        Not Fount exception constructor
        """
        super().__init__()
        self.error = error
        self.status_code = 404


class InvalidPayload(Exception):
    """
    *404* `Invalid Payload`

    Raise if a the payload does not meet the requirements
    """

    def __init__(self, error):
        """
        Invalid Payload exception constructor
        """
        super().__init__()
        self.error = error
        self.status_code = 400


class ConflictError(Exception):
    """
    *409* `Conflict`

    Raise if a resource has a conflict
    """

    def __init__(self, error):
        """
        Conflict exception constructor
        """
        super().__init__()
        self.error = error
        self.status_code = 409
