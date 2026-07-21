from collections.abc import Mapping

from app.alerts.constants import DEFAULT_THRESHOLDS, OFFLINE_AGE, RESOLVE_MARGIN
from app.alerts.enums import AlertColor, AlertType
from app.db.models import ProviderModel
from app.utils import utcnow


class BaseRule:
    type: AlertType
    color = AlertColor.RED

    def triggered(self, provider: ProviderModel, thresholds: Mapping[str, float]) -> bool:
        raise NotImplementedError

    def resolved(self, provider: ProviderModel, thresholds: Mapping[str, float]) -> bool:
        raise NotImplementedError


class BaseThresholdRule(BaseRule):
    column: str

    def value(self, provider: ProviderModel) -> float | None:
        value: float | None = getattr(provider, self.column)
        return value

    def triggered(self, provider: ProviderModel, thresholds: Mapping[str, float]) -> bool:
        value = self.value(provider)
        return value is not None and value >= thresholds[self.type.value]

    def resolved(self, provider: ProviderModel, thresholds: Mapping[str, float]) -> bool:
        value = self.value(provider)
        return value is not None and value < thresholds[self.type.value] - RESOLVE_MARGIN


class ProviderOffline(BaseRule):
    type = AlertType.PROVIDER_OFFLINE
    color = AlertColor.ORANGE

    def triggered(self, provider: ProviderModel, thresholds: Mapping[str, float]) -> bool:
        return self.is_offline(provider)

    def resolved(self, provider: ProviderModel, thresholds: Mapping[str, float]) -> bool:
        return not self.is_offline(provider)

    @staticmethod
    def is_offline(provider: ProviderModel) -> bool:
        if provider.telemetry_at is None or utcnow() - provider.telemetry_at <= OFFLINE_AGE:
            return False
        return provider.is_reachable is not True


class CpuHigh(BaseThresholdRule):
    type = AlertType.CPU_HIGH
    column = "cpu_load_percent"


class RamHigh(BaseThresholdRule):
    type = AlertType.RAM_HIGH
    column = "ram_load_percent"


class DiskLoadHigh(BaseThresholdRule):
    type = AlertType.DISK_LOAD_HIGH
    column = "disk_load_percent"


class DiskSpaceLow(BaseThresholdRule):
    type = AlertType.DISK_SPACE_LOW

    def value(self, provider: ProviderModel) -> float | None:
        return disk_space_percent(provider)


class NetworkHigh(BaseThresholdRule):
    type = AlertType.NETWORK_HIGH

    def value(self, provider: ProviderModel) -> float | None:
        return net_load_percent(provider)


def disk_space_percent(provider: ProviderModel) -> float | None:
    if provider.disk_used is None or not provider.disk_total:
        return None
    return round(provider.disk_used / provider.disk_total * 100, 2)


def net_load_percent(provider: ProviderModel) -> float | None:
    if provider.net_mbps is None or not provider.net_capacity_mbps:
        return None
    return round(provider.net_mbps / provider.net_capacity_mbps * 100, 2)


def evaluate(provider: ProviderModel, user_thresholds: Mapping[str, float]) -> list[BaseRule]:
    thresholds = {**DEFAULT_THRESHOLDS, **user_thresholds}
    return [rule for rule in RULES if rule.triggered(provider, thresholds)]


RULES: tuple[BaseRule, ...] = (
    ProviderOffline(),
    CpuHigh(),
    RamHigh(),
    DiskLoadHigh(),
    DiskSpaceLow(),
    NetworkHigh(),
)
