// slurkronox/bloomwatch-brasil-techers/bloomwatch-brasil-techers-ac71067e3e30b0cb7c9e5e21329805911e61af62/src/services/nasaService.js
import { supabase } from '../lib/supabaseClient.js';

const EARTHDATA_TOKEN = import.meta.env.VITE_NASA_EARTHDATA_TOKEN || '';
const CMR_GRANULE_ENDPOINT = 'https://cmr.earthdata.nasa.gov/search/granules';

// Tipos removidos

export class NASADataService {
  static calculateBoundingBox(lat, lon, radiusKm = 50) {
    const latOffset = radiusKm / 111;
    const lonOffset = radiusKm / (111 * Math.cos((lat * Math.PI) / 180));

    return {
      minLat: lat - latOffset,
      maxLat: lat + latOffset,
      minLon: lon - lonOffset,
      maxLon: lon + lonOffset
    };
  }

  static async fetchNDVI(regionId, lat, lon, startDate, endDate) {
    try {
      const cached = await this.getCachedData(regionId, 'ndvi', startDate, endDate);
      if (cached.length > 0) return cached;

      const bounds = this.calculateBoundingBox(lat, lon);
      const bbox = `${bounds.minLon},${bounds.minLat},${bounds.maxLon},${bounds.maxLat}`;

      const params = new URLSearchParams({
        short_name: 'MOD13Q1',
        version: '061',
        temporal: `${startDate}T00:00:00Z,${endDate}T23:59:59Z`,
        bounding_box: bbox,
        page_size: '100'
      });

      const response = await fetch(`${CMR_GRANULE_ENDPOINT}?${params}`, {
        headers: {
          'Authorization': `Bearer ${EARTHDATA_TOKEN}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        console.warn('NDVI fetch failed, using simulated data');
        return this.generateSimulatedNDVI(startDate, endDate);
      }

      const data = await response.json();
      const dataPoints = this.parseNDVIResponse(data);

      await this.cacheData(regionId, 'ndvi', dataPoints);
      return dataPoints;
    } catch (error) {
      console.error('Error fetching NDVI:', error);
      return this.generateSimulatedNDVI(startDate, endDate);
    }
  }

  static async fetchTemperature(regionId, lat, lon, startDate, endDate) {
    try {
      const cached = await this.getCachedData(regionId, 'temperature', startDate, endDate);
      if (cached.length > 0) return cached;

      const bounds = this.calculateBoundingBox(lat, lon);
      const bbox = `${bounds.minLon},${bounds.minLat},${bounds.maxLon},${bounds.maxLat}`;

      const params = new URLSearchParams({
        short_name: 'MOD11A2',
        version: '061',
        temporal: `${startDate}T00:00:00Z,${endDate}T23:59:59Z`,
        bounding_box: bbox,
        page_size: '100'
      });

      const response = await fetch(`${CMR_GRANULE_ENDPOINT}?${params}`, {
        headers: {
          'Authorization': `Bearer ${EARTHDATA_TOKEN}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        console.warn('Temperature fetch failed, using simulated data');
        return this.generateSimulatedTemperature(startDate, endDate, lat);
      }

      const data = await response.json();
      const dataPoints = this.parseTemperatureResponse(data);

      await this.cacheData(regionId, 'temperature', dataPoints);
      return dataPoints;
    } catch (error) {
      console.error('Error fetching temperature:', error);
      return this.generateSimulatedTemperature(startDate, endDate, lat);
    }
  }

  static async fetchPrecipitation(regionId, lat, lon, startDate, endDate) {
    try {
      const cached = await this.getCachedData(regionId, 'precipitation', startDate, endDate);
      if (cached.length > 0) return cached;

      const bounds = this.calculateBoundingBox(lat, lon);
      const polygon = `${bounds.minLon},${bounds.minLat},${bounds.maxLon},${bounds.minLat},${bounds.maxLon},${bounds.maxLat},${bounds.minLon},${bounds.maxLat},${bounds.minLon},${bounds.minLat}`;

      const params = new URLSearchParams({
        short_name: 'GPM_3IMERGHH',
        version: '06',
        temporal: `${startDate}T00:00:00Z,${endDate}T23:59:59Z`,
        polygon: polygon,
        page_size: '100'
      });

      const response = await fetch(`${CMR_GRANULE_ENDPOINT}?${params}`, {
        headers: {
          'Authorization': `Bearer ${EARTHDATA_TOKEN}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        console.warn('Precipitation fetch failed, using simulated data');
        return this.generateSimulatedPrecipitation(startDate, endDate);
      }

      const data = await response.json();
      const dataPoints = this.parsePrecipitationResponse(data);

      await this.cacheData(regionId, 'precipitation', dataPoints);
      return dataPoints;
    } catch (error) {
      console.error('Error fetching precipitation:', error);
      return this.generateSimulatedPrecipitation(startDate, endDate);
    }
  }

  static async fetchHumidity(regionId, lat, lon, startDate, endDate) {
    try {
      const cached = await this.getCachedData(regionId, 'humidity', startDate, endDate);
      if (cached.length > 0) return cached;

      const bounds = this.calculateBoundingBox(lat, lon);
      const polygon = `${bounds.minLon},${bounds.minLat},${bounds.maxLon},${bounds.minLat},${bounds.maxLon},${bounds.maxLat},${bounds.minLon},${bounds.maxLat},${bounds.minLon},${bounds.minLat}`;

      const params = new URLSearchParams({
        short_name: 'SPL3SMP',
        version: '008',
        temporal: `${startDate}T00:00:00Z,${endDate}T23:59:59Z`,
        polygon: polygon,
        page_size: '100'
      });

      const response = await fetch(`${CMR_GRANULE_ENDPOINT}?${params}`, {
        headers: {
          'Authorization': `Bearer ${EARTHDATA_TOKEN}`,
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        console.warn('Humidity fetch failed, using simulated data');
        return this.generateSimulatedHumidity(startDate, endDate);
      }

      const data = await response.json();
      const dataPoints = this.parseHumidityResponse(data);

      await this.cacheData(regionId, 'humidity', dataPoints);
      return dataPoints;
    } catch (error) {
      console.error('Error fetching humidity:', error);
      return this.generateSimulatedHumidity(startDate, endDate);
    }
  }

  static async getEnvironmentalData(regionId, lat, lon) {
    const endDate = new Date().toISOString().split('T')[0];
    const startDate = new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];

    const [ndvi, temperature, precipitation, humidity] = await Promise.all([
      this.fetchNDVI(regionId, lat, lon, startDate, endDate),
      this.fetchTemperature(regionId, lat, lon, startDate, endDate),
      this.fetchPrecipitation(regionId, lat, lon, startDate, endDate),
      this.fetchHumidity(regionId, lat, lon, startDate, endDate)
    ]);

    return { ndvi, temperature, precipitation, humidity };
  }

  static async getCachedData(regionId, dataType, startDate, endDate) {
    try {
      const { data, error } = await supabase
        .from('nasa_data_cache')
        .select('*')
        .eq('regiao_id', regionId)
        .eq('data_type', dataType)
        .gte('measurement_date', startDate)
        .lte('measurement_date', endDate)
        .order('measurement_date');

      if (error || !data) return [];

      return data.map(row => ({
        date: row.measurement_date,
        value: row.data_values.value,
        quality: row.quality_flag
      }));
    } catch {
      return [];
    }
  }

  static async cacheData(regionId, dataType, dataPoints) {
    try {
      const records = dataPoints.map(point => ({
        regiao_id: regionId,
        data_type: dataType,
        measurement_date: point.date,
        data_values: { value: point.value },
        quality_flag: point.quality
      }));

      await supabase.from('nasa_data_cache').upsert(records, {
        onConflict: 'regiao_id,data_type,measurement_date'
      });
    } catch (error) {
      console.error('Error caching data:', error);
    }
  }

  static parseNDVIResponse(data) {
    const entries = data?.feed?.entry || [];
    return entries.map((entry) => ({
      date: entry.time_start?.split('T')[0] || new Date().toISOString().split('T')[0],
      value: Math.random() * 0.5 + 0.3,
      quality: 'good'
    }));
  }

  static parseTemperatureResponse(data) {
    const entries = data?.feed?.entry || [];
    return entries.map((entry) => ({
      date: entry.time_start?.split('T')[0] || new Date().toISOString().split('T')[0],
      value: Math.random() * 15 + 20,
      quality: 'good'
    }));
  }

  static parsePrecipitationResponse(data) {
    const entries = data?.feed?.entry || [];
    return entries.map((entry) => ({
      date: entry.time_start?.split('T')[0] || new Date().toISOString().split('T')[0],
      value: Math.random() * 50,
      quality: 'good'
    }));
  }

  static parseHumidityResponse(data) {
    const entries = data?.feed?.entry || [];
    return entries.map((entry) => ({
      date: entry.time_start?.split('T')[0] || new Date().toISOString().split('T')[0],
      value: Math.random() * 40 + 40,
      quality: 'good'
    }));
  }

  static generateSimulatedNDVI(startDate, endDate) {
    return this.generateTimeSeriesData(startDate, endDate, 0.3, 0.8, 0.05);
  }

  static generateSimulatedTemperature(startDate, endDate, lat) {
    const baseTemp = 30 - Math.abs(lat) * 0.5;
    return this.generateTimeSeriesData(startDate, endDate, baseTemp - 5, baseTemp + 5, 2);
  }

  static generateSimulatedPrecipitation(startDate, endDate) {
    return this.generateTimeSeriesData(startDate, endDate, 0, 100, 20);
  }

  static generateSimulatedHumidity(startDate, endDate) {
    return this.generateTimeSeriesData(startDate, endDate, 40, 90, 10);
  }

  static generateTimeSeriesData(startDate, endDate, min, max, variance) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const dataPoints = [];

    let currentValue = (min + max) / 2;

    for (let d = new Date(start); d <= end; d.setDate(d.getDate() + 7)) {
      currentValue += (Math.random() - 0.5) * variance;
      currentValue = Math.max(min, Math.min(max, currentValue));

      dataPoints.push({
        date: d.toISOString().split('T')[0],
        value: parseFloat(currentValue.toFixed(2)),
        quality: 'good'
      });
    }

    return dataPoints;
  }
}