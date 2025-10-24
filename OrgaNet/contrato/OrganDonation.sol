// SPDX-License-Identifier: MIT
pragma solidity >= 0.8.1;

contract Queue {

    uint private head;
    uint private tail;
    mapping(uint => address) private patients;

    constructor() {
        head = 1;
        tail = 1;
    }

    /// @notice Returns true if the queue is empty
    function isEmpty() public view returns(bool) {
        return head == tail;
    }

    /// @notice Add an element on the final
    function add(address _address) public {
        patients[tail] = _address;
        tail++;
    }

    /// @notice Remove the first element
    function remove() public {
        require(!isEmpty(), "The queue is empty.");
        delete patients[head];
        head++;
    }

    /// @notice Get the head / the first element
    function getHead() public view returns(address) {
        require(!isEmpty(), "The queue is empty.");
        return patients[head];
    }

    /// @notice Returns the number of elements in the queue
    function size() public view returns(uint) {
        return tail - head;
    }
}

contract OrganDonation {

    /// @notice Accepted types of organs
    enum Organ { SANGRE, CORAZON, PULMON }
    enum PatientType { DONOR, DONEE}

    /// @notice Stores the details of donors and donees
    struct Person {
        uint id;
        string first_name;
        string last_name;
        string email;
        address _address;
        Organ organ;
        PatientType patientType;
    }

    /// @notice Mapping to store donors and donees
    mapping(address => Person) private donors;
    mapping(address => Person) private donees;

    /// @notice Mapping to store donors by organ type
    mapping(Organ => Queue) private organDonors;

    /// @notice Mapping to store donees by organ type
    mapping(Organ => Queue) private organDonees;

    /// @notice All matches that took place
    event Match(uint256 timestamp, address donor, address donee);

    constructor() {
        // Inicializar las 3 colas de donantes
        organDonors[Organ.SANGRE] = new Queue();
        organDonors[Organ.CORAZON] = new Queue();
        organDonors[Organ.PULMON] = new Queue();

        // Inicializar las 3 colas de receptores
        organDonees[Organ.SANGRE] = new Queue();
        organDonees[Organ.CORAZON] = new Queue();
        organDonees[Organ.PULMON] = new Queue();
    }

    /// @notice Creates a new donor
    function createDonor(uint _id, string memory _first_name, string memory _last_name, string memory _email, address _address, Organ _organ) public {
        
        // Create a new donor
        Person memory newDonor = Person(_id, _first_name, _last_name, _email, _address, _organ, PatientType.DONOR);

        // Add donor to the donors mapping
        donors[_address] = newDonor;

        if (!matching(newDonor)) {
            // Add the donor's address to the organDonors mapping only if there is no a match
            organDonors[_organ].add(_address);
        }
    }

    /// @notice Creates a new donee
    function createDonee(uint _id, string memory _first_name, string memory _last_name, string memory _email, address _address, Organ _organ) public {
        
        // Create a new donee
        Person memory newDonee = Person(_id, _first_name, _last_name, _email, _address, _organ, PatientType.DONEE);
        
        // Add donee to the donees mapping
        donees[_address] = newDonee;

        if (!matching(newDonee)) {
            // Add the donee's address to the organDonees mapping only if there is no a match
            organDonees[_organ].add(_address);
        }
    }

    /// @notice Connects a donor with a donee
    function matching(Person memory patient) private returns(bool) {

        // Verify if there is a donee who needs the especific organ
        if (patient.patientType == PatientType.DONOR && !organDonees[patient.organ].isEmpty()) {
            emit Match(block.timestamp, patient._address, organDonees[patient.organ].getHead());
            organDonees[patient.organ].remove();
            return true;
        }

        // Verify if there is a donor who has the especific organ
        if (patient.patientType == PatientType.DONEE && !organDonors[patient.organ].isEmpty()) {
            emit Match(block.timestamp, organDonors[patient.organ].getHead(), patient._address);
            organDonors[patient.organ].remove();
            return true;
        }

        return false;
    }

    /// @notice Returns the information of an especific donor
    function getDonor(address _address) public view returns(Person memory) {
        return donors[_address];
    }

    /// @notice Returns the information of an especific donee
    function getDonee(address _address) public view returns(Person memory) {
        return donees[_address];
    }
}