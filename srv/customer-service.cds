using {com.logali as logali} from '../db/schema';

service CustomerServiceen {

    entity CustomerSrv as projection on logali.Customer;
}
