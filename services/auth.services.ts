import { httpClient } from "@/lib/axios/httpClient"

const getDoctor = async () => {
    const doctors = await httpClient.get('/doctors');
    return doctors;
}

